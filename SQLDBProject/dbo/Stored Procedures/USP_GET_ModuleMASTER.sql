
CREATE PROCEDURE [dbo].[USP_GET_ModuleMASTER]	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * from ModuleMaster order by statusOrder
	SET NOCOUNT OFF;
END