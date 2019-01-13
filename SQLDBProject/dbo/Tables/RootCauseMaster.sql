CREATE TABLE [dbo].[RootCauseMaster] (
    [RootCauseId] INT            IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (100) NULL,
    [Isdelete]    BIT            NULL,
    CONSTRAINT [PK_RootCauseMaster] PRIMARY KEY CLUSTERED ([RootCauseId] ASC)
);

