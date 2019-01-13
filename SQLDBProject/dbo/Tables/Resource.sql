CREATE TABLE [dbo].[Resource] (
    [ResourceId] INT           IDENTITY (1, 1) NOT NULL,
    [FName]      NVARCHAR (50) NULL,
    [Lname]      NVARCHAR (50) NULL,
    [Email]      NVARCHAR (80) NULL,
    [Pwd]        NVARCHAR (50) NULL,
    [Roles]      NVARCHAR (10) NOT NULL,
    [Isactive]   BIT           NOT NULL,
    CONSTRAINT [PK_Resource] PRIMARY KEY CLUSTERED ([ResourceId] ASC)
);

