/* 
** @function 
** @params 
** @return 
*/
export const types = (type:any): string => {
  return Object.prototype.toString.call(type)
}