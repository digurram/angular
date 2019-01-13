CREATE FUNCTION [dbo].[Ufn_RoleDEscription](@Roles Nvarchar(20) ) RETURNS nvarchar(200)
AS
BEGIN
DECLARE @RoleDEsc nvarchar(200)
SELECT @RoleDEsc =Stuff(( SELECT ', ' + roleDescription  FROM rolemaster where RoleId in (select cast(string  as INT) FROM  [dbo].[ufn_CSVToTable](@Roles))
    FOR XML PATH('')
    ), 1, 2, '') 

  FROM RoleMaster 
  RETURN @RoleDEsc
END