CREATE procedure [dbo].[sp_getDEtails]

AS
BEGIN

Begin Transaction
Begin Try
SET NOCOUNT ON;  
DECLARE @maxval int
DECLARE  @MyTable Table
(
myid int identity(100,1),
Numbers int
)

 SET @maxval=0
while @maxval<1500
BEGIN
INSERT into @MyTable values(@maxval)
SET @maxval=@maxval+1
END
--print @maxval
select * from @MyTable
SET NOCOUNT OFF;  
End Try
Begin catch
If @@TRANCOUNT>0
   ROLLBACK TRANSACTION;
RAISERROR('Failed to insert',16,0);
End catch
If @@TRANCOUNT>0
   Commit TRANSACTION;
end