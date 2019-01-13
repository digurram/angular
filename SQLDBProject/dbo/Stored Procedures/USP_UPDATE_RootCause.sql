
CREATE PROCEDURE [dbo].[USP_UPDATE_RootCause]
(
@RootCauseId INT,
@Description Nvarchar(200)

)
AS
BEGIN
	UPDATE RootCauseMaster SET Description=@Description WHERE RootCauseId=@RootCauseId	
END