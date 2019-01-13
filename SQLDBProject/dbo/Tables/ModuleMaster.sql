CREATE TABLE [dbo].[ModuleMaster] (
    [ModuleId]    INT            IDENTITY (1, 1) NOT NULL,
    [ModuleName]  NVARCHAR (100) NULL,
    [statusOrder] INT            NULL,
    [IsDeleted]   BIT            NULL,
    CONSTRAINT [PK_ModuleMaster] PRIMARY KEY CLUSTERED ([ModuleId] ASC),
    CONSTRAINT [FK_ModuleMaster_ModuleMaster] FOREIGN KEY ([ModuleId]) REFERENCES [dbo].[ModuleMaster] ([ModuleId])
);

