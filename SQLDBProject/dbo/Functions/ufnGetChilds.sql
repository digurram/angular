CREATE FUNCTION [dbo].[ufnGetChilds](@parentId int)
RETURNS @Chids TABLE 
(

  parent_entity_id int  , 
    child_entity_id int
	)

	AS 
	BEGIN
	;with CTE as (
select  @parentId 'Parent_Entity_ID',Child_Entity_ID from ENTITY_LINK WHERE parent_entity_id=@parentId
)
insert into  @Chids Select Parent_Entity_ID,child_entity_id from ENTITY_LINK WHERE Child_Entity_ID in (select Child_Entity_ID from CTE)


return;
	END