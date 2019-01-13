
CREATE PROCEDURe [dbo].[Proc_GetTickets]
(
@Ticketid int
)
AS BEGIN
	SELECT * FROM tickets WHERE ticketid=@Ticketid
END