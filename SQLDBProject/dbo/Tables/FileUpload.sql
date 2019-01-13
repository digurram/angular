CREATE TABLE [dbo].[FileUpload] (
    [Fileid]     INT             IDENTITY (1, 1) NOT NULL,
    [Filedata]   VARBINARY (MAX) NULL,
    [TicketId]   INT             NULL,
    [Filetype]   NVARCHAR (15)   NULL,
    [UploadDate] DATETIME        NULL,
    [FileName]   NVARCHAR (150)  NULL,
    CONSTRAINT [PK_FileUpload] PRIMARY KEY CLUSTERED ([Fileid] ASC),
    CONSTRAINT [FK_FileUpload_Tickets] FOREIGN KEY ([TicketId]) REFERENCES [dbo].[Tickets] ([TicketId])
);

