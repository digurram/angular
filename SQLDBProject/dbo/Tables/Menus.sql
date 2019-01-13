CREATE TABLE [dbo].[Menus] (
    [MenuId]      INT            IDENTITY (1, 1) NOT NULL,
    [DisplayName] NVARCHAR (100) NULL,
    CONSTRAINT [PK_Menus] PRIMARY KEY CLUSTERED ([MenuId] ASC)
);

