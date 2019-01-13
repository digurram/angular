CREATE TABLE [dbo].[ApplicationMaster] (
    [ApplicationId]   INT            IDENTITY (1, 1) NOT NULL,
    [ApplicationName] NVARCHAR (100) NULL,
    [statusOrder]     INT            NULL,
    [IsDeleted]       BIT            NULL,
    CONSTRAINT [PK_ApplicationMaster] PRIMARY KEY CLUSTERED ([ApplicationId] ASC)
);

