
export const filterResourcesBelongsToUser = (resourceList, userId) => resourceList.filter((item) => item.user && item.user.id === userId)
