CREATE  view dbo.vw_user_permissions
as
select
    distinct  mn.displayname,   mi.menuitemid, mi.link, mi.parentmenuid, mi.sortorder, u.userid	,ur.roleid
from
    UserMaster u
    join userroles ur on (u.userid = ur.userid)    
    join MenuPermission per on (ur.roleid = per.roleid  )
    join menuitems mi on (per.menuitemid = mi.menuitemid)
	JOIN menus mn on mn.menuid=mi.menuid