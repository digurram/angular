CREATE TABLE [dbo].[UserRoles] (
    [Mappingid] INT IDENTITY (1, 1) NOT NULL,
    [UserId]    INT NOT NULL,
    [RoleId]    INT NOT NULL,
    CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED ([Mappingid] ASC),
    CONSTRAINT [FK_UserRoles_RoleMaster] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[RoleMaster] ([RoleId]),
    CONSTRAINT [FK_UserRoles_UserMaster] FOREIGN KEY ([UserId]) REFERENCES [dbo].[UserMaster] ([UserId])
);

