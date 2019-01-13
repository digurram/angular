CREATE PROCEDURE [dbo].[USP_GET_Resource]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT resourceid, RTRIM(Lname)+', '+RTRIM(Fname)  as'ResourceName' from Resource 
	SET NOCOUNT OFF;
END