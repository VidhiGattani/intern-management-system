using Microsoft.EntityFrameworkCore;

namespace PrimusApi.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Intern> Interns { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Evaluations> Evaluations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // -------------------------
            // TABLE NAMES
            // -------------------------
            modelBuilder.Entity<Intern>().ToTable("interns");
            modelBuilder.Entity<Project>().ToTable("projects");
            modelBuilder.Entity<Evaluations>().ToTable("evaluations");

            // -------------------------
            // PRIMARY KEYS
            // -------------------------
            modelBuilder.Entity<Intern>()
                .HasKey(i => i.Intern_Id);

            modelBuilder.Entity<Project>()
                .HasKey(p => p.Project_Id);

            modelBuilder.Entity<Evaluations>()
                .HasKey(e => e.Evaluation_Id);

            // -------------------------
            // INTERN COLUMN MAPS
            // -------------------------
            modelBuilder.Entity<Intern>().Property(i => i.Intern_Id).HasColumnName("intern_id");
            modelBuilder.Entity<Intern>().Property(i => i.First_Name).HasColumnName("first_name");
            modelBuilder.Entity<Intern>().Property(i => i.Last_Name).HasColumnName("last_name");
            modelBuilder.Entity<Intern>().Property(i => i.Year_Graduation).HasColumnName("year_graduation");
            modelBuilder.Entity<Intern>().Property(i => i.Email).HasColumnName("email");
            modelBuilder.Entity<Intern>().Property(i => i.Phone).HasColumnName("phone");
            modelBuilder.Entity<Intern>().Property(i => i.Degree).HasColumnName("degree");
            modelBuilder.Entity<Intern>().Property(i => i.University).HasColumnName("university");

            // -------------------------
            // PROJECT COLUMN MAPS
            // -------------------------
            modelBuilder.Entity<Project>().Property(p => p.Project_Id).HasColumnName("project_id");
            modelBuilder.Entity<Project>().Property(p => p.Owner_Id).HasColumnName("owner_id");
            modelBuilder.Entity<Project>().Property(p => p.Title).HasColumnName("title");
            modelBuilder.Entity<Project>().Property(p => p.Description).HasColumnName("description");
            modelBuilder.Entity<Project>().Property(p => p.Tech_Stack).HasColumnName("tech_stack");
            modelBuilder.Entity<Project>().Property(p => p.Start_Date).HasColumnName("start_date");
            modelBuilder.Entity<Project>().Property(p => p.End_Date).HasColumnName("end_date");

            // -------------------------
            // EVALUATIONS COLUMN MAPS
            // -------------------------
            modelBuilder.Entity<Evaluations>().Property(e => e.Evaluation_Id).HasColumnName("evaluation_id");
            modelBuilder.Entity<Evaluations>().Property(e => e.Intern_Id).HasColumnName("intern_id");
            modelBuilder.Entity<Evaluations>().Property(e => e.Project_Id).HasColumnName("project_id");
            modelBuilder.Entity<Evaluations>().Property(e => e.Score).HasColumnName("score");
            modelBuilder.Entity<Evaluations>().Property(e => e.Feedback).HasColumnName("feedback");
            modelBuilder.Entity<Evaluations>().Property(e => e.Evaluator).HasColumnName("evaluator");
        }
    }
}
