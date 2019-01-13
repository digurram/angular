CREATE TABLE [dbo].[TradeValidationError] (
    [TradeValidationErrorID] INT            IDENTITY (1, 1) NOT NULL,
    [TradeId]                INT            NULL,
    [ErrorCode]              NVARCHAR (300) NULL,
    CONSTRAINT [PK_TradeValidationError] PRIMARY KEY CLUSTERED ([TradeValidationErrorID] ASC),
    CONSTRAINT [FK_TradeValidationError_Trade] FOREIGN KEY ([TradeId]) REFERENCES [dbo].[Trade] ([TradeId])
);

