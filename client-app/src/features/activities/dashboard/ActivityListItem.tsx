import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { useStore } from "../../../app/api/stores/store";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;
  
    function handleActivityDelete(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: string
    ) {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
    }
    
    return (
        <Item key={activity.id}>
        <Item.Content>
          <Item.Header>{activity.title}</Item.Header>
          <Item.Meta>{activity.date}</Item.Meta>
          <Item.Description>
            {activity.description}
            <div>
              {activity.city}, {activity.venue}
            </div>
          </Item.Description>
          <Item.Extra>
            <Button
              as={Link}
              to={`/activities/${activity.id}`}
              floated="right"
              content="View"
              color="blue"
            />
            <Button
              name={activity.id}
              loading={loading && target === activity.id}
              onClick={(e) => handleActivityDelete(e, activity.id)}
              floated="right"
              content="Delete"
              color="red"
            />
            <Label basic content={activity.category} />
          </Item.Extra>
        </Item.Content>
      </Item>
        )
}