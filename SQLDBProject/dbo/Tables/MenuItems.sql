CREATE TABLE [dbo].[MenuItems] (
    [MenuItemId]   INT            IDENTITY (1, 1) NOT NULL,
    [MenuId]       INT            NOT NULL,
    [link]         NVARCHAR (100) NULL,
    [parentmenuid] INT            NULL,
    [Sortorder]    INT            NULL,
    CONSTRAINT [PK_MenuItems] PRIMARY KEY CLUSTERED ([MenuItemId] ASC),
    CONSTRAINT [FK_MenuItems_Menus] FOREIGN KEY ([MenuId]) REFERENCES [dbo].[Menus] ([MenuId])
);

