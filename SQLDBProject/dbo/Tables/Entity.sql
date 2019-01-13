CREATE TABLE [dbo].[Entity] (
    [ID]           INT           IDENTITY (1, 1) NOT NULL,
    [Name]         VARCHAR (200) NULL,
    [Reference_ID] INT           NULL,
    CONSTRAINT [PK_Entity] PRIMARY KEY CLUSTERED ([ID] ASC)
);

