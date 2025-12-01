namespace PrimusApi.Models
{
    public class Evaluations
    {
        public int Evaluation_Id { get; set; }  // MUST MATCH DB COLUMN NAME
        public int Intern_Id { get; set; }
        public int Project_Id { get; set; }
        public float Score { get; set; }
        public string Feedback { get; set; }
        public string Evaluator { get; set; }
    }
}
