CREATE TABLE [dbo].[FinancialEventSourceSwift] (
    [FinancialEventSourceSwiftId] INT             IDENTITY (1, 1) NOT NULL,
    [FinancialEventSourceId]      INT             NULL,
    [SwiftMessageId]              INT             NULL,
    [SwiftMessageTypeId]          INT             NULL,
    [BatchId]                     INT             NULL,
    [SenderBic]                   INT             NULL,
    [Message]                     NVARCHAR (200)  NULL,
    [MessageXML]                  NVARCHAR (2000) NULL,
    [ReceiveDateTime]             DATETIME        NULL,
    CONSTRAINT [PK_FinancialEventSourceSwift] PRIMARY KEY CLUSTERED ([FinancialEventSourceSwiftId] ASC),
    CONSTRAINT [FK_FinancialEventSourceSwift_FinancialEventSource] FOREIGN KEY ([FinancialEventSourceId]) REFERENCES [dbo].[FinancialEventSource] ([FinancialEventSourceId])
);

