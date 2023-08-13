// 获取菜单
export const fetchMenu = (params, config = {}) => uni.$uv.http.get('/applet/index/getRecommendDocs', params, config)
