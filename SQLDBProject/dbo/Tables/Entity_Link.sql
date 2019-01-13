CREATE TABLE [dbo].[Entity_Link] (
    [Link_ID]          INT IDENTITY (1, 1) NOT NULL,
    [Parent_Entity_ID] INT NULL,
    [Child_Entity_ID]  INT NULL,
    CONSTRAINT [PK_Entity_Link] PRIMARY KEY CLUSTERED ([Link_ID] ASC),
    CONSTRAINT [FK_Entity_Link_Entity] FOREIGN KEY ([Parent_Entity_ID]) REFERENCES [dbo].[Entity] ([ID]),
    CONSTRAINT [FK_Entity_Link_Entity1] FOREIGN KEY ([Child_Entity_ID]) REFERENCES [dbo].[Entity] ([ID])
);

