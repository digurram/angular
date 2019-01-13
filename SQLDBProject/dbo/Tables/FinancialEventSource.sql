CREATE TABLE [dbo].[FinancialEventSource] (
    [FinancialEventSourceId]     INT      IDENTITY (1, 1) NOT NULL,
    [FinancialEventSourceTypeId] INT      NULL,
    [CaptureDateTime]            DATETIME NULL,
    CONSTRAINT [PK_FinancialEventSource] PRIMARY KEY CLUSTERED ([FinancialEventSourceId] ASC)
);

