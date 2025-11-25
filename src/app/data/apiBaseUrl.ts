const host = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : '';
export const baseUrl = `${host}/api/v1/`;
