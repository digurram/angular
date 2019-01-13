CREATE TABLE [dbo].[FXTrade] (
    [FXTradeId]                       INT             IDENTITY (1, 1) NOT NULL,
    [FinancialEventId]                INT             NULL,
    [PortfolioId]                     INT             NULL,
    [BrokerId]                        INT             NULL,
    [TradeDate]                       DATETIME        NULL,
    [SettlementDate]                  DATETIME        NULL,
    [SpotForward]                     DECIMAL (18, 2) NULL,
    [Rate]                            DECIMAL (18, 2) NULL,
    [HiportRef]                       NVARCHAR (200)  NULL,
    [TradeCurrencyId]                 INT             NULL,
    [CounterPartyCurrencyId]          INT             NULL,
    [TradeNominal]                    NVARCHAR (200)  NULL,
    [CounterPartyNominal]             NVARCHAR (200)  NULL,
    [Position]                        INT             NULL,
    [SenderToReceieverInfo]           NVARCHAR (2000) NULL,
    [TradeAllocationFinancialEventId] INT             NULL,
    [MatchStatusId]                   INT             NULL,
    CONSTRAINT [PK_FXTrade] PRIMARY KEY CLUSTERED ([FXTradeId] ASC)
);

