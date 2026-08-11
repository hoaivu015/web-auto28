# Ví Dụ Minh Họa Refactor Codebase (Trước & Sau)

Tài liệu này cung cấp các ví dụ thực tế giúp bạn hình dung cách chuyển đổi mã nguồn từ trạng thái cũ (chứa lỗi kiểu dữ liệu TypeScript, phong cách viết CSS phẳng lỳ) sang trạng thái mới (type-safe 100%, phong cách **Neural Expressive 2.0** cực kỳ cao cấp).

---

## ═══ VÍ DỤ 1: REFACTOR VIEW COMPONENT (DESIGN SYSTEM + TYPESCRIPT) ═══

### 🔴 TRƯỚC KHI REFACTOR (Mã nguồn lỗi, CSS phẳng)
```tsx
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react'; // Lỗi TS6133: Không sử dụng

interface UpdateData {
  name: string;
  phone: string;
}

export const LegacyPersonalView = ({ 
  user, 
  onSave, 
  updateCarStatus 
}: { 
  user: any; 
  onSave: (data: { name: string; phone: string }) => void;
  updateCarStatus: (id: number, nextStatus: string, extra?: any) => Promise<void>;
}) => {
  const [profile, setProfile] = useState({ name: user.name, phone: user.phone, department: user.department });

  // Lỗi TS2322: Gán trực tiếp setProfile cho callback chỉ chấp nhận { name, phone }
  const handleUpdate = () => {
    onSave(profile); 
  };

  const handleStatusChange = async (carId: number) => {
    // Lỗi TS2322: Truyền tham số không trùng khớp kiểu chữ của extra (cần Record<string, unknown>)
    await updateCarStatus(carId, "SOLD", undefined);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Thông tin cá nhân</h2>
      <input 
        value={profile.name} 
        onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
      />
      <button onClick={handleUpdate}>Cập nhật</button>
    </div>
  );
};
```

---

### 🟢 SAU KHI REFACTOR (Hoàn hảo về Kiểu & Giao diện Liquid Glass)
```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { DESIGN_TOKENS } from '@/src/shared/design-system/tokens';

interface UserProfile {
  name: string;
  phone: string;
  department: string;
}

interface PersonalViewProps {
  user: UserProfile;
  onSave: (data: { name: string; phone: string }) => void;
  updateCarStatus: (id: number, nextStatus: 'IN_STOCK' | 'DEPOSITED' | 'SOLD', extra?: Record<string, unknown>) => Promise<void>;
}

export const NeuralPersonalView: React.FC<PersonalViewProps> = ({ 
  user, 
  onSave, 
  updateCarStatus 
}) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: user.name,
    phone: user.phone,
    department: user.department
  });

  // Giải quyết lỗi TS2322 bằng cách tạo wrapper callback định hình chuẩn dữ liệu
  const handleUpdate = async () => {
    try { await Haptics.impact({ style: ImpactStyle.Light }); } catch (e) {}
    
    onSave({
      name: profile.name,
      phone: profile.phone
    });
    
    try { await Haptics.notification({ type: NotificationType.Success }); } catch (e) {}
  };

  const handleStatusChange = async (carId: number) => {
    // Giải quyết lỗi truyền undefined cho Record đầu bằng cách truyền {}
    await updateCarStatus(carId, "SOLD", {});
  };

  return (
    <div 
      className={`w-full ${DESIGN_TOKENS.effects.glass} ${DESIGN_TOKENS.radius.base} ${DESIGN_TOKENS.effects.shadow} p-8 flex flex-col gap-4 select-none`}
    >
      <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-2">
        Thông tin cá nhân
      </h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Họ và Tên</label>
        <input 
          type="text"
          value={profile.name} 
          onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
          className="w-full h-14 bg-white/50 backdrop-blur-md border border-black/5 rounded-[20px] px-5 outline-none font-bold text-gray-900 focus:border-indigo-500 transition-all"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleUpdate}
        className="w-full h-14 bg-black text-white font-bold rounded-full cursor-pointer hover:bg-indigo-600 transition-colors shadow-lg"
      >
        Cập nhật thông tin
      </motion.button>
    </div>
  );
};
```

---

## ═══ VÍ DỤ 2: REFACTOR APPLICATION LAYER (FINANCE LOGIC) ═══

### 🔴 TRƯỚC KHI REFACTOR (Lỗi Type & Khai báo thừa)
```typescript
import { UnifiedExpenseDTO } from './dto'; // Lỗi TS6133: Khai báo không dùng

export interface CostItem {
  amount: number;
  note: string;
  date: string;
  staff_id: string; // Yêu cầu chuỗi cứng
}

export class RecordExpense {
  execute(items: any[]): CostItem[] {
    // Lỗi TS2322: staff_id có thể nhận string | undefined từ payload bối cảnh
    return items.map(item => ({
      amount: item.amount,
      note: item.note,
      date: item.date,
      staff_id: item.staff_id, // Lỗi ở đây vì item.staff_id có thể là undefined
    }));
  }
}
```

---

### 🟢 SAU KHI REFACTOR (Type safety hoàn toàn)
```typescript
export interface CostItem {
  amount: number;
  note: string;
  date: string;
  staff_id: string;
}

export class RecordExpense {
  execute(items: { amount: number; note?: string; date: string; staff_id?: string }[]): CostItem[] {
    return items.map(item => {
      // Bảo vệ kiểu dữ liệu chặt chẽ và nạp giá trị fallback an toàn
      if (!item.staff_id) {
        throw new Error("Không thể lưu chi phí: Thiếu thông tin nhân viên (staff_id).");
      }
      
      return {
        amount: item.amount,
        note: item.note ?? "",
        date: item.date,
        staff_id: item.staff_id, // Bây giờ Type compiler đã chắc chắn đây là string
      };
    });
  }
}
```
