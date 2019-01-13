
CREATE PROCEDURE [dbo].[USP_GET_ApplicationeMASTER]	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * from ApplicationMaster order by statusOrder
	SET NOCOUNT OFF;
END