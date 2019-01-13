
CREATE PROCEDURE [dbo].[SP_LogException]
(
	@xmlException  nvarchar(max) 
	)
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @idoc INT
	EXEC sp_xml_preparedocument @idoc OUTPUT, @xmlException
	INSERT INTO dbo.Exception
           (Message,StackTrace,UserId,ExceptionDateTime,InnerExceptionmessage,ControllerName,ActionName) 
		   
		   SELECT Message,StackTrace,UserId,GETDATE(),InnerExceptionmessage,ControllerName,ActionName FROM  OPENXML(@idoc, '/ExceptionModel',2) with (	  
		  	Message nvarchar(150) ,	StackTrace nvarchar(4000) ,	UserId Nvarchar(5) ,	ExceptionDateTime datetime ,	InnerExceptionmessage nvarchar(4000) ,
	ControllerName nvarchar(50) ,	ActionName nvarchar(50) )
EXEC sp_xml_removedocument @idoc  	 


END TRY
BEGIN CATCH
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;
	SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();
		RAISERROR (@ErrorMessage, 
					   @ErrorSeverity,
					   @ErrorState 
					   );

    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
END CATCH;

IF @@TRANCOUNT > 0
  COMMIT TRANSACTION;

  END