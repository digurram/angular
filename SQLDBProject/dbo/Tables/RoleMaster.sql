CREATE TABLE [dbo].[RoleMaster] (
    [RoleId]          INT            IDENTITY (1, 1) NOT NULL,
    [RoleDescription] NVARCHAR (100) NULL,
    [IsActive]        BIT            NULL,
    CONSTRAINT [PK_RoleMaster] PRIMARY KEY CLUSTERED ([RoleId] ASC)
);

