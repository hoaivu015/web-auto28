const fs = require('fs');

const supabaseUrl = 'https://wcnyxxbfdtsmgynozkvk.supabase.co';
const supabaseKey = 'sb_publishable_DtL05cs1XRASAJsfyv2sRw_7JdtPa7X';

async function fetchVehicles() {
    try {
        const url = `${supabaseUrl}/rest/v1/vehicles?status=not.eq.SOLD&select=*&order=id.desc`;
        const response = await fetch(url, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Fetched ${data.length} vehicles from Supabase.`);

        // Save to file for comparison
        fs.writeFileSync('scratch/supabase_vehicles.json', JSON.stringify(data, null, 2));

        // Print simplified vehicle list for preview
        const simplified = data.map(v => ({
            id: v.id,
            name: v.name,
            year: v.year,
            odo: v.odo,
            sale_price: v.sale_price,
            color: v.color,
            battery_type: v.battery_type,
            show_on_landing: v.show_on_landing
        }));
        console.log('Vehicles list:\n', JSON.stringify(simplified, null, 2));
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
}

fetchVehicles();
