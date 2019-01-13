CREATE PROCEDURE [dbo].[USP_GETTypdMASTER]	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * from TypeMaster order by typeOrder
	SET NOCOUNT OFF;
END