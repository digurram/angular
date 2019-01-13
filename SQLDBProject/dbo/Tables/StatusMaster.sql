CREATE TABLE [dbo].[StatusMaster] (
    [StatusId]          INT            IDENTITY (1, 1) NOT NULL,
    [StatusDescription] NVARCHAR (100) NULL,
    [statusOrder]       INT            NULL,
    [IsDeleted]         BIT            NULL,
    CONSTRAINT [PK_StatusMaster] PRIMARY KEY CLUSTERED ([StatusId] ASC)
);

