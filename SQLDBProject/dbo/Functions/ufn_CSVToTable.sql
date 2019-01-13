
-- =============================================
-- Name:			ufn_CSVToTable
-- Purpose: 		to Get comma separated values into Table valued function
-- =============================================
-- Change History
-- Date    Author   Comments
-- -----   ------   -----------------------------
-- 27/06/2014 	Narendranath	   Fn ALTERd.
-- =============================================
CREATE FUNCTION [dbo].[ufn_CSVToTable] ( @StringInput VARCHAR(8000) )
RETURNS @OutputTable TABLE ( [String] VARCHAR(10) )
AS
BEGIN

    DECLARE @String    VARCHAR(10)

    WHILE LEN(@StringInput) > 0
    BEGIN
        SET @String      = LEFT(@StringInput, 
                                ISNULL(NULLIF(CHARINDEX(',', @StringInput) - 1, -1),
                                LEN(@StringInput)))
        SET @StringInput = SUBSTRING(@StringInput,
                                     ISNULL(NULLIF(CHARINDEX(',', @StringInput), 0),
                                     LEN(@StringInput)) + 1, LEN(@StringInput))

        INSERT INTO @OutputTable ( [String] )
        VALUES ( @String )
    END
    
    RETURN
END