CREATE TABLE [dbo].[PriorityMaster] (
    [PriorityId]          INT            IDENTITY (1, 1) NOT NULL,
    [PriorityDescription] NVARCHAR (100) NULL,
    [PriorityOrder]       INT            NULL,
    [IsDeleted]           BIT            NULL,
    CONSTRAINT [PK_PriorityMaster] PRIMARY KEY CLUSTERED ([PriorityId] ASC)
);

