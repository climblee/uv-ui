const { http } = uni.$uv
// 获取菜单
export const fetchMenu = (params, config = {}) => http.get('/applet/index/getRecommendDocs', params, config)
