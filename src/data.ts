import { Experience, SkillCategory, Certification, Education } from "./types";

export const professionalSummary = [
  "Senior Data Engineer with 8+ years of experience designing, building, and optimizing enterprise-grade data platforms across AWS, Azure, and GCP for healthcare, financial services, and retail domains.",
  "Deep expertise in large-scale ETL/ELT pipelines, Lakehouse architecture, real-time streaming, data warehousing, Snowflake, Databricks, Apache Spark, Kafka, dbt, and cloud-native data engineering.",
  "Proven ability to own end-to-end data lifecycle delivery, including ingestion, transformation, orchestration, modeling, governance, observability, performance tuning, CI/CD, and production support.",
  "Delivered measurable impact by reducing pipeline runtime by 30%, improving query performance by 60%, supporting 100+ GB daily processing workloads, and saving $250K+ annually through Spark, Snowflake, and cloud cost optimization.",
  "Strong background building trusted data products for analytics, machine learning, executive dashboards, financial reporting, operational intelligence, and regulated data environments.",
  "Experienced in mentoring engineers, partnering with business stakeholders, and translating complex requirements into scalable, secure, and reliable data platforms."
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Cloud Platforms",
    skills: [
      "AWS (S3, Glue, Redshift, Lambda, Athena, Kinesis, EMR, IAM, CloudWatch)",
      "Azure (Data Factory, Synapse Analytics, Databricks, ADLS Gen2, Event Hubs, Purview)",
      "GCP (BigQuery, Pub/Sub, Dataflow, Cloud Storage, GKE)"
    ],
    icon: "Cloud"
  },
  {
    category: "Data Engineering & Architecture",
    skills: [
      "ETL / ELT Pipelines",
      "Pipeline Design & Ingestion",
      "Batch & Real-Time Processing",
      "Lakehouse & Medallion Architecture",
      "Data Warehousing & Modeling",
      "Star & Snowflake Schemas",
      "Data Migration & Integration",
      "Reverse ETL"
    ],
    icon: "Database"
  },
  {
    category: "Big Data & Processing",
    skills: [
      "Apache Spark",
      "PySpark",
      "Spark SQL",
      "Structured Streaming",
      "Apache Kafka",
      "Hadoop & HDFS",
      "Delta Lake",
      "Apache Iceberg",
      "Apache Huid",
      "Apache Flink"
    ],
    icon: "Cpu"
  },
  {
    category: "Data Platforms",
    skills: [
      "Databricks",
      "Snowflake",
      "Google BigQuery",
      "AWS Redshift",
      "Azure Synapse Analytics",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "DynamoDB",
      "Redis"
    ],
    icon: "HardDrive"
  },
  {
    category: "Orchestration & Quality",
    skills: [
      "Apache Airflow",
      "dbt (Core / Cloud)",
      "Databricks Workflows",
      "AWS Glue & ADF Workflows",
      "Prefect",
      "Great Expectations",
      "Monte Carlo",
      "OpenLineage"
    ],
    icon: "GitBranch"
  },
  {
    category: "Governance, DevOps & Languages",
    skills: [
      "RBAC & IAM Data Governance",
      "PII/PHI & HIPAA/SOC2 Compliance",
      "Terraform (IaC)",
      "Docker & Kubernetes",
      "GitHub Actions & CI/CD",
      "Python",
      "SQL",
      "Scala",
      "Java & Bash",
      "Power BI & Tableau Dashboarding"
    ],
    icon: "Sliders"
  }
];

export const experiences: Experience[] = [
  {
    company: "PFIZER",
    role: "Senior Data Engineer",
    period: "Aug 2024 – Present",
    location: "New York, NY",
    bullets: [
      "Architected enterprise ETL/ELT pipelines processing 100+ GB of pharmaceutical, clinical, and operational data daily using Apache Spark, Databricks, Kafka, Snowflake, BigQuery, and Python, accelerating delivery of trusted analytics.",
      "Engineered Medallion Architecture across Databricks, Delta Lake, Apache Iceberg, and BigQuery, enabling ACID-compliant, time-travel-enabled data lakehouse layers across hundreds of millions of monthly records.",
      "Built high-throughput batch and streaming ingestion pipelines from DynamoDB, MongoDB, Snowflake, Kafka, AWS Kinesis, and GCP Pub/Sub, powering predictive analytics and patient-outcome reporting workflows.",
      "Led migration of legacy on-premise data workflows to cloud-native GCP architecture using BigQuery, Dataflow, Pub/Sub, and Cloud Storage, consolidating multi-terabyte datasets and improving cross-team accessibility.",
      "Optimized Spark and Databricks pipelines using partition pruning, predicate pushdown, file compaction, broadcast joins, autoscaling, and cluster right-sizing, reducing processing time by 30% and saving $250K+ annually in compute costs.",
      "Implemented enterprise data governance using GCP Cloud DLP, IAM, Snowflake Row-Level Security, BigQuery column-level security, RBAC, and audit-ready access controls to protect PHI, PII, and sensitive clinical datasets.",
      "Established end-to-end lineage and metadata cataloging using DataHub, OpenLineage, dbt documentation, and automated tagging, improving traceability from raw ingestion to curated analytics layers.",
      "Developed reverse ETL pipelines moving analytics-ready data from Snowflake and BigQuery into Salesforce CRM, Looker, and REST APIs, closing the loop between warehouse insights and business operations.",
      "Containerized and orchestrated production data workloads using Apache Airflow on Kubernetes with Helm and Terraform-managed infrastructure, reducing manual operations and improving system reliability.",
      "Built automated data quality frameworks using dbt tests, Great Expectations, Monte Carlo, SQL assertions, and Python validations, improving freshness, accuracy, and anomaly detection.",
      "Partnered with analytics, product, compliance, and clinical teams to define data requirements, build KPI-ready datasets, and deliver executive dashboards in Looker and BigQuery BI Engine.",
      "Mentored junior engineers on Spark optimization, Databricks development, Medallion Architecture, Kafka streaming, and production-ready cloud data engineering practices."
    ],
    technologies: [
      "Apache Spark", "PySpark", "Databricks", "Kafka", "Snowflake", "BigQuery", "dbt", "AWS Kinesis",
      "GCP Pub/Sub", "MongoDB", "DynamoDB", "Delta Lake", "Apache Iceberg", "Apache Airflow",
      "Kubernetes", "Terraform", "Docker", "Looker", "Salesforce CRM", "DataHub", "OpenLineage",
      "Great Expectations", "Monte Carlo", "Python", "SQL", "GCP"
    ],
    metrics: [
      { label: "Daily Data Volume", value: "100+ GB" },
      { label: "Annual Cost Savings", value: "$250K+" },
      { label: "Runtime Reduction", value: "30%" }
    ]
  },
  {
    company: "ATHENAHEALTH",
    role: "Data Engineer",
    period: "Mar 2023 – Jul 2024",
    location: "Watertown, MA",
    bullets: [
      "Built automated healthcare data ingestion pipelines using AWS S3, Lambda, Glue, Databricks, Spark, PySpark, and SQL, processing hundreds of millions of clinical, billing, and operational records.",
      "Developed scalable ETL/ELT workflows using Apache Spark, dbt, Snowflake, BigQuery, and AWS Redshift, supporting reliable daily analytics for care coordination and revenue cycle teams.",
      "Implemented real-time streaming pipelines using AWS Kinesis, Kafka, and Databricks Structured Streaming, processing patient-event data with low latency for clinical monitoring.",
      "Designed dimensional models using Star Schema and Snowflake Schema principles in dbt, creating reusable data marts for BI dashboards, predictive analytics, and finance reporting.",
      "Modernized data infrastructure using Snowflake and AWS Redshift, improving query performance for large-scale reporting workloads and reducing analyst wait times.",
      "Applied partitioning, clustering, distribution keys, compression, and SQL refactoring in Redshift and Snowflake, improving complex query performance by 60% while reducing cloud consumption.",
      "Assisted migration of legacy on-premise databases to AWS using AWS DMS, S3, Glue, and CloudFormation, consolidating fragmented databases.",
      "Automated 20+ production workflows using Apache Airflow, AWS Glue, and dbt, improving SLA compliance and dependency-aware executions.",
      "Implemented automated data validation using dbt tests, Great Expectations, SQL assertions, and Python validations across millions of records, ensuring HIPAA/SOC 2 compliance.",
      "Used AWS Glue Data Catalog and metadata tagging to improve data discovery, lineage visibility, and governed reuse of regulated healthcare datasets.",
      "Built and maintained Power BI and Tableau dashboards connected to Snowflake and Redshift, delivering clinical and financial KPIs to leadership.",
      "Supported production incidents by diagnosing failed ETL jobs, late-arriving data, and schema changes across AWS, Databricks, and Snowflake systems."
    ],
    technologies: [
      "AWS S3", "AWS Lambda", "AWS Glue", "AWS Kinesis", "AWS Redshift", "AWS DMS", "AWS CloudFormation",
      "AWS Glue Data Catalog", "Databricks", "Apache Spark", "Kafka", "Apache Airflow", "dbt",
      "Snowflake", "BigQuery", "Terraform", "Docker", "GitHub Actions", "Power BI", "Tableau",
      "Great Expectations", "Python", "SQL"
    ],
    metrics: [
      { label: "Query Speed Improvement", value: "60%" },
      { label: "Workflows Automated", value: "20+" },
      { label: "Compliance Focus", value: "HIPAA/SOC2" }
    ]
  },
  {
    company: "MASTERCARD",
    role: "Data Engineer",
    period: "Apr 2021 – Feb 2023",
    location: "O'Fallon, MO",
    bullets: [
      "Built and maintained high-volume ETL/ELT pipelines using Databricks, Apache Spark, PySpark, Scala, SQL, Hadoop, and Hive to process transactional payment and financial data for fraud analytics.",
      "Developed near real-time streaming pipelines using Azure Event Hubs, Kafka, and Databricks Structured Streaming, surfacing payment transaction insights for fraud detection and operational analytics.",
      "Consolidated structured and semi-structured payment data into Azure Synapse Analytics and Azure Data Lake Storage Gen2, improving scalability for analytics workloads.",
      "Collaborated with data scientists to prepare feature-engineered datasets using Python, Pandas, NumPy, PySpark, and SQL for ML models focused on fraud detection and payment behavior.",
      "Applied Star Schema and Snowflake Schema modeling techniques using dbt and SQL, improving query performance and KPI consistency across teams.",
      "Supported data governance and lineage tracking using Azure Purview, dbt documentation, metadata tagging, and access controls.",
      "Developed and maintained Power BI dashboards integrating financial data from multiple payment-processing systems, supporting operational and executive reporting.",
      "Assisted migration of legacy financial systems to modern Lakehouse architecture on ADLS Gen2 and Databricks, consolidating payment workflows.",
      "Improved query performance on large transaction datasets through partitioning, indexing, caching, broadcast joins, and distributed Spark processing, accelerating trend analysis by 40%."
    ],
    technologies: [
      "Databricks", "Apache Spark", "PySpark", "Scala", "Spark SQL", "Apache Airflow", "Azure Event Hubs",
      "Azure Synapse Analytics", "Azure SQL Data Warehouse", "Azure Data Lake Storage Gen2", "Snowflake", "dbt",
      "Azure Purview", "Power BI", "Python", "Pandas", "NumPy", "SQL", "Azure"
    ],
    metrics: [
      { label: "Trend Analysis Acceleration", value: "40%" },
      { label: "Core Security Focus", value: "Fraud Detection" },
      { label: "Platform Target", value: "Azure Synapse" }
    ]
  },
  {
    company: "THE HOME DEPOT",
    role: "ETL Developer / Data Engineer",
    period: "Oct 2018 – Mar 2021",
    location: "Atlanta, GA",
    bullets: [
      "Built ETL workflows using Python, SQL, Spark, PySpark, Hadoop, HDFS, and Hive to ingest and standardize retail transaction, inventory, product, vendor, and supply-chain datasets.",
      "Developed Spark and PySpark jobs on Hadoop to transform large retail data feeds into curated Hive tables with optimized partitioning, improving analyst query performance by 60%.",
      "Implemented incremental loading patterns with partitioned datasets, optimized joins, and reusable validation logic, reducing loading cycles of inventory from 4 hours to 45 minutes.",
      "Created Sqoop-based ingestion pipelines from relational retail databases into HDFS with schema validation and data contract checks, improving reliability across product, store, and logistics data.",
      "Built Oozie-coordinated batch workflows with dependency handling and idempotent outputs, achieving 98% daily processing reliability across pipelines.",
      "Modeled dimensional subject areas for product, store, supplier, transaction, inventory, and logistics entities, aligning definitions across merchandising and finance teams.",
      "Developed Kafka-based streaming ingestion for real-time point-of-sale and inventory events, landing records into HDFS for Spark processing.",
      "Applied Hadoop security best practices using Kerberos authentication and Ranger authorization policies to enforce least-privilege access.",
      "Implemented metadata tagging and Atlas-style lineage tracking, supporting auditability and governed reuse of critical retail tables for demand forecasting.",
      "Created automated data quality checks using SQL assertions and Python validations, preventing malformed files, duplicate keys, and schema drift before downstream BI consumption."
    ],
    technologies: [
      "Python", "SQL", "Apache Spark", "PySpark", "Hadoop", "Hive", "HDFS", "Sqoop", "Oozie", "Kafka",
      "Kerberos", "Ranger", "Atlas", "SQL Agent", "SSIS", "SSRS", "Crystal Reports", "Informatica PowerCenter",
      "TFS", "Confluence", "Visio"
    ],
    metrics: [
      { label: "Inventory Cycle Speedup", value: "4.3x (4h to 45m)" },
      { label: "Daily Batch Reliability", value: "98%+" },
      { label: "Query Speedup (Hive)", value: "60%" }
    ]
  }
];

export const certifications: Certification[] = [
  { name: "Google Cloud Professional Data Engineer" },
  { name: "HashiCorp Terraform Associate" },
  { name: "Snowflake SnowPro Advanced: Architect" }
];

export const education: Education[] = [
  {
    institution: "Texas A&M University–Commerce",
    location: "Commerce, TX",
    degree: "Master of Science in Computer Science"
  }
];

export const contactDetails = {
  name: "Tanka Raj Joshi",
  role: "Senior Data Engineer | Data Architect",
  location: "Dallas, TX",
  phone: "(940) 441-3864",
  email: "tankajoshi788@gmail.com",
  linkedin: "https://www.linkedin.com/in/tanka-raj-joshi" // Standardized link format
};
