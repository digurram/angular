CREATE TABLE [dbo].[UserMaster] (
    [UserId]    INT            IDENTITY (1, 1) NOT NULL,
    [FName]     NVARCHAR (100) NULL,
    [LName]     NVARCHAR (100) NULL,
    [Email]     NVARCHAR (100) NULL,
    [IsDeleted] BIT            NULL,
    CONSTRAINT [PK_UserMaster] PRIMARY KEY CLUSTERED ([UserId] ASC)
);

