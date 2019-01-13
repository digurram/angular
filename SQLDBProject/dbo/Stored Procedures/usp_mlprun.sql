create procedure [dbo].[usp_mlprun]
as
 BEGIN
 DECLARE @rank INT = 0;

WHILE @rank < 15000 --(you can use Select count (*) from your table name as well)
BEGIN
   DECLARE @FromDate DATETIME = DATEADD(DAY, -720, GETDATE()) -- 2 years back
   DECLARE @ToDate   DATETIME = DATEADD(DAY, -1, GETDATE()) -- until yesterday

   DECLARE @Seconds INT = DATEDIFF(SECOND, @FromDate, @ToDate)
   DECLARE @Random INT = ROUND(((@Seconds-1) * RAND()), 0)
   DECLARE @Milliseconds INT = ROUND((999 * RAND()), 0)

update FXTrade
Set SettlementDate = DATEADD(MILLISECOND, @Milliseconds, DATEADD(SECOND, @Random, @FromDate))
WHERE FXTradeId = @rank ANd cast(Tradedate as date)<>cast(SettlementDate as date)
   SET @rank = @rank + 1;       
END
END