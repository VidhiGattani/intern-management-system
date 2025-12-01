namespace PrimusApi.Models
{
    public class Project
    {
        public int Project_Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Tech_Stack { get; set; }
        public int Owner_Id { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
    }
}
