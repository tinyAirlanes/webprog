/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required
 * @property {string} fullname
 * @property {integer} role
 * @property {date} registeredAt
 * @property {string} avaUrl
 * @property {bool} isEnabled
 */
class User 
{

     constructor(id,login,fullname,role,registeredAt,avaUrl,isEnabled)
     {
         this.id = id;
         this.login = login;
         this.fullname = fullname;
         this.role = role;
         this.registeredAt = registeredAt;
         this.avaUrl = avaUrl;
         this.isEnabled = isEnabled;

     }




}
module.exports = User;