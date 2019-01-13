CREATE TABLE [dbo].[Exception] (
    [ExceptionId]           INT             IDENTITY (1, 1) NOT NULL,
    [Message]               NVARCHAR (150)  NULL,
    [StackTrace]            NVARCHAR (4000) NULL,
    [UserId]                INT             NULL,
    [ExceptionDateTime]     DATETIME        NULL,
    [InnerExceptionmessage] NVARCHAR (4000) NULL,
    [ControllerName]        NVARCHAR (50)   NULL,
    [ActionName]            NVARCHAR (50)   NULL,
    CONSTRAINT [PK_Exception] PRIMARY KEY CLUSTERED ([ExceptionId] ASC)
);

