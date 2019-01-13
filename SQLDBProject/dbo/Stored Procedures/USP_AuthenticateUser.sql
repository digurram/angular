CREATE PROCEDURE [dbo].[USP_AuthenticateUser]
(
@UserId Nvarchar(150),
@password Nvarchar(150)
)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT ResourceId,FName,Lname,Email, Lname+', '+FName As 'Username',dbo.Ufn_RoleDEscription(Roles) 'Roles' FROM RESOURCE WHERE  Email=@UserId and ASCII(@password) =ASCII(Pwd)
	SET NOCOUNT OFF;
END