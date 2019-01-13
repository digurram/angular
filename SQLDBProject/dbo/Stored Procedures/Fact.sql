CREATE PROCEDURE [dbo].[Fact]
(
@Number Integer,
@RetVal Integer OUTPUT
)
AS
DECLARE @In Integer
DECLARE @Out Integer
IF @Number != 1
BEGIN
SELECT @In = @Number - 1
EXEC Fact @In, @Out OUTPUT -- Same stored procedure has been called again(Recursively)
SELECT @RetVal = @Number * @Out
END
ELSE
BEGIN
SELECT @RetVal = 1
END
RETURN