CREATE TABLE [dbo].[TypeMaster] (
    [TypeId]          INT            IDENTITY (1, 1) NOT NULL,
    [TypeDescription] NVARCHAR (100) NULL,
    [TypeOrder]       INT            NULL,
    [IsDeleted]       BIT            NULL,
    CONSTRAINT [PK_TypeMaster] PRIMARY KEY CLUSTERED ([TypeId] ASC)
);

