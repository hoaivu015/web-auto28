const fs = require('fs');

const supabaseUrl = 'https://wcnyxxbfdtsmgynozkvk.supabase.co';
const supabaseKey = 'sb_publishable_DtL05cs1XRASAJsfyv2sRw_7JdtPa7X';

async function fetchConfig() {
    try {
        const url = `${supabaseUrl}/rest/v1/landingpage_config?id=eq.1&select=*`;
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
        console.log('Fetched Config from Supabase:\n', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching config:', error);
    }
}

fetchConfig();
