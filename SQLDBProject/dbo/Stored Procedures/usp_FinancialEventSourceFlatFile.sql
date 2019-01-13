create procedure [dbo].[usp_FinancialEventSourceFlatFile]
as
 BEGIN
 DECLARE @rank INT = 0;

WHILE @rank < 25000 --(you can use Select count (*) from your table name as well)
BEGIN

   insert into FinancialEventSourceFlatFile(FinancialEventSourceId,FileName) values(FLOOR(Rand()*((25000-1)-1)),'FileName'+cast(@rank as nvarchar))
/*
update FXTrade
Set SettlementDate = DATEADD(MILLISECOND, @Milliseconds, DATEADD(SECOND, @Random, @FromDate))
WHERE FXTradeId = @rank ANd cast(Tradedate as date)<>cast(SettlementDate as date)
*/
   SET @rank = @rank + 1;       
END
END

Declare @maxrun int
Set @maxrun=0
While @maxrun<50
BEGIN
EXEC usp_mlprun
SET @maxrun=@maxrun+1
END