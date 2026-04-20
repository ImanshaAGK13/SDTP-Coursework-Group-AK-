const BASE_URL = 'http://localhost:5013/api'; // Synchronized with launchSettings.json (Port 5013)

const api = {
    async get(endpoint) {
        return this.request(endpoint, 'GET');
    },

    async post(endpoint, body, isFormData = false) {
        return this.request(endpoint, 'POST', body, isFormData);
    },

    async put(endpoint, body) {
        return this.request(endpoint, 'PUT', body);
    },

    async patch(endpoint, body) {
        return this.request(endpoint, 'PATCH', body);
    },

    async delete(endpoint) {
        return this.request(endpoint, 'DELETE');
    },

    async request(endpoint, method, body = null, isFormData = false) {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token ? `Bearer ${token}` : '',
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            method,
            headers,
        };

        if (body) {
            config.body = isFormData ? body : JSON.stringify(body);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        if (response.status === 204) return null;
        return response.json();
    }
};

export default api;
