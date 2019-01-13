
CREATE PROCEDURE [dbo].[USP_INSERT_RootCause]
(

@Description Nvarchar(200)

)
AS
BEGIN
	INSERT INTO  RootCauseMaster(Description,Isdelete) VALUES(@Description,1)	
END