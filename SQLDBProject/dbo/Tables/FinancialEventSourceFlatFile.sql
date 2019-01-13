CREATE TABLE [dbo].[FinancialEventSourceFlatFile] (
    [FinancialEventSourceFlatFileId] INT            IDENTITY (1, 1) NOT NULL,
    [FinancialEventSourceId]         INT            NULL,
    [ClientProfileId]                INT            NULL,
    [FlatFileProcessingStatusId]     INT            NULL,
    [FileName]                       NVARCHAR (200) NULL,
    [ReceiveDir]                     NVARCHAR (200) NULL,
    [ReceiveDateTime]                DATETIME       NULL,
    [ProcessingNotes]                NVARCHAR (200) NULL,
    [LastUpdatedUser]                INT            NULL,
    [LastUpdatedDateTime]            DATETIME       NULL,
    CONSTRAINT [PK_FinancialEventSourceFlatFile] PRIMARY KEY CLUSTERED ([FinancialEventSourceFlatFileId] ASC),
    CONSTRAINT [FK_FinancialEventSourceFlatFile_FinancialEventSource] FOREIGN KEY ([FinancialEventSourceId]) REFERENCES [dbo].[FinancialEventSource] ([FinancialEventSourceId])
);

