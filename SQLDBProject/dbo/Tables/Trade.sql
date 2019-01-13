CREATE TABLE [dbo].[Trade] (
    [TradeId]              INT             IDENTITY (1, 1) NOT NULL,
    [TradeFileID]          INT             NULL,
    [TradeTypeId]          INT             NULL,
    [ClientTradeRef]       NVARCHAR (200)  NULL,
    [SecurityCode]         NVARCHAR (200)  NULL,
    [Units]                NVARCHAR (200)  NULL,
    [Price]                DECIMAL (18, 2) NULL,
    [Brokerage]            INT             NULL,
    [BrokerageGST]         DECIMAL (18, 2) NULL,
    [NetSettlementValue]   DECIMAL (18, 2) NULL,
    [GrossSettlementValue] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_Trade] PRIMARY KEY CLUSTERED ([TradeId] ASC)
);

