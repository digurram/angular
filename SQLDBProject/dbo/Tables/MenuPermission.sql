CREATE TABLE [dbo].[MenuPermission] (
    [MenuItemId] INT NOT NULL,
    [RoleId]     INT NULL,
    CONSTRAINT [FK_MenuPermission_MenuItems] FOREIGN KEY ([MenuItemId]) REFERENCES [dbo].[MenuItems] ([MenuItemId]),
    CONSTRAINT [FK_MenuPermission_RoleMaster] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[RoleMaster] ([RoleId])
);

